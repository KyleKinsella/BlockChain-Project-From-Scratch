import time
import os

DOWNLOADSWinner = "/home/kylekinsella/Downloads/winner.txt"
DSTWinner = "/home/kylekinsella/Documents/BlockChain-Project-From-Scratch/user-interface/blockchain-frontend/public/winner.txt"

DOWNLOADSAlias = "/home/kylekinsella/Downloads/allAliases.txt"
DSTAlias = "/home/kylekinsella/Documents/BlockChain-Project-From-Scratch/user-interface/blockchain-frontend/public/allAliases.txt"

def moveWinnerTxtFile():
    if os.path.exists(DOWNLOADSWinner):
        os.rename(DOWNLOADSWinner, DSTWinner)
        print("winner.txt has been moved to ", DSTWinner)

def moveAllAliasesTxtFile():
    if os.path.exists(DOWNLOADSAlias):
        os.rename(DOWNLOADSAlias, DSTAlias)
        print("allAliases.txt has been moved to ", DSTAlias)

while True:
    moveWinnerTxtFile()
    time.sleep(2)

    moveAllAliasesTxtFile()
    time.sleep(2)
