import time
import os

DOWNLOADS = "/home/kylekinsella/Downloads/winner.txt"
DST = "/home/kylekinsella/Documents/BlockChain-Project-From-Scratch/user-interface/blockchain-frontend/public/winner.txt"

def moveFile():
    if os.path.exists(DOWNLOADS):
        os.rename(DOWNLOADS, DST)
        print("winner.txt has been moved to ", DST)

while True:
    moveFile()
    time.sleep(2)
