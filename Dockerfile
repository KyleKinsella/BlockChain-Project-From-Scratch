FROM golang:1.23
WORKDIR /usr/src/app 
COPY . .

#COPY BlockMain ./
#COPY WalletMain ./
#COPY DAOMain ./
COPY user-interface/blockchain-frontend/src/Wallet/Get-random-words-for-seed-phrase ./

CMD ["go", "run", "randomWords.go"] 
