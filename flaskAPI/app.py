import requests
import os
from flask import Flask,render_template,request
URL = "https://geocode.search.hereapi.com/v1/geocode"
#street = input("Enter the street here: ") #taking user input
#zip = input("Enter the zip code: ")
#city = input("Enter the city here: ")
#country =  input("Enter the country here: ")
#location = street +","+zip+","+ city+","+ country
api_key = 'J_z60tR6HA_Pr8jkLoJdUIvnp21ZUgqgowSXXIJ8Ttg' # Acquire from developer.here.com

import numpy as np
import hashlib

def theta(t1, t2):
    return t1 == t2

class TPM:
    '''TPM
    Tree Parity Machine is a special type of multi-layer feed-forward neural network.
    K - number of hidden neurons
    N - number of input neurons connected to each hidden neuron
    L - range of each weight ({-L,..,0,..,+L })
    W - weight matrix between input and hidden layers. Dimensions : [K, N]
    tau - output score
    '''
    def __init__(self, K=8, N=12, L=4):
        self.K = K
        self.N = N
        self.L = L
        self.W = np.random.randint(-L, L + 1, [K, N])
        self.tau = 0

    def get_output(self, X):
        '''
        Returns a binary digit tau for a given random vecor.
        X - Input random vector
        '''
        X = X.reshape([self.K, self.N])

        sigma = np.sign(np.sum(X * self.W, axis=1))
        tau = np.prod(sigma)

        self.X = X
        self.sigma = sigma
        self.tau = tau

        return tau

    def hebbian(self, tau1, tau2):
        '''
        hebbian update rule
        '''
        for (i, j), _ in np.ndenumerate(self.W):
            self.W[i, j] += self.X[i, j] * tau1 * theta(self.sigma[i], tau1) * theta(tau1, tau2)
            self.W[i, j] = np.clip(self.W[i, j] , -self.L, self.L)

    def anti_hebbian(self, tau1, tau2):
        '''
        anti-hebbian update rule
        '''
        for (i, j), _ in np.ndenumerate(self.W):
            self.W[i, j] -= self.X[i, j] * tau1 * theta(self.sigma[i], tau1) * theta(tau1, tau2)
            self.W[i, j] = np.clip(self.W[i, j], -self.L, self.L)

    def random_walk(self, tau1, tau2):
        '''
        random walk update rule
        '''
        for (i, j), _ in np.ndenumerate(self.W):
            self.W[i, j] += self.X[i, j] * theta(self.sigma[i], tau1) * theta(tau1, tau2)
            self.W[i, j] = np.clip(self.W[i, j] , -self.L, self.L)        

    def update(self, tau2, update_rule='hebbian'):
        '''
        Updates the weights according to the specified update rule.
        tau2 - Output bit from the other machine;
        update_rule - The update rule : ['hebbian', 'anti_hebbian', random_walk']
        '''
        if self.tau == tau2:
            if update_rule == 'hebbian':
                self.hebbian(self.tau, tau2)
            elif update_rule == 'anti_hebbian':
                self.anti_hebbian(self.tau, tau2)
            elif update_rule == 'random_walk':
                self.random_walk(self.tau, tau2)
            else:
                raise Exception("Invalid update rule. Valid update rules are: " + 
                    "\'hebbian\', \'anti_hebbian\' and \'random_walk\'.")

    #make key from weight matrix
    def makeKey(self, key_length, iv_length):
        '''makeKey
        weight matrix to key and iv : use sha256 on concatenated weights 
        '''
        key = ''
        iv = ''
        # generate key
        for (i, j), _ in np.ndenumerate(self.W):
            if i == j:
                iv += str(self.W[i, j])
            key += str(self.W[i, j])
        # sha256 iv
        hash_object_iv = hashlib.sha256(iv)
        hex_dig_iv = hash_object_iv.hexdigest()            
        # sha256 key
        hash_object_key = hashlib.sha256(key)
        hex_dig_key = hash_object_key.hexdigest()
        return (hex_dig_key[0:int(key_length / 4)], hex_dig_iv[0:int(iv_length / 4)])

#Flask code 
app = Flask(__name__)

@app.route('/',methods=['post'])
def latlong():
    location = request.form['location']
    PARAMS = {'apikey':api_key,'q':location} 
    # sending get request and saving the response as response object 
    r = requests.get(url = URL, params = PARAMS) 
    data = r.json()
    #print(data)
    #Acquiring the latitude and longitude from JSON 
    latitude = data['items'][0]['position']['lat']
    print(latitude)
    longitude = data['items'][0]['position']['lng']
    print(longitude)
    return latitude+","+longitude
	 
@app.route('/neuralKeyGen',methods=['post'])
def TPM():

    return ""

    
if __name__ == '__main__':
    app.run(port = 5006)