# Utilisez une image de base appropriée pour Node.js
FROM node:14

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie du fichier des dépendances npm et installation
COPY package.json package-lock.json /app/
RUN npm install

# Copie du reste du code frontend
COPY . /app/front-end

# Exposition du port sur lequel l'application React écoute
EXPOSE 3000

# Commande de démarrage de l'application React
CMD ["npm", "start"]
