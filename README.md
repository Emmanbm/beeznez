# BeezNez

Application web permettant aux entreprises de gérer leurs employés et aux freelances de gérer leurs horaires.

# Frontend: React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# ÉTAPES DE MISE EN PROD

[Télécharger et installer gcloud en ligne de commande](https://cloud.google.com/sdk/docs/install?hl=fr#deb)

- Suivre les étapes de [cette vidéo.](https://youtu.be/0FUsQkZyd48?si=ZdBUNq7JKM3I4Haz), celles qui expliquent comment créer un projet et les produits à activer sur le projet.

- Se connecter au compte Google Cloud :

```bash
    gcloud auth login
```

- Authentifier Docker avec GCP (ici on utilise Paris, donc europe-west9)

```bash
    gcloud auth configure-docker europe-west9-docker.pkg.dev
```

- En utilisant Docker Compose, construire les images de chaque micro-service individuellement pour pouvoir les déployer :

```bash
    docker compose -f docker-compose.prod.yml build
```

- Taguer chaque image vers GCP :

```bash
docker tag beeznez-auth europe-west9-docker.pkg.dev/beeznez-446307/beeznez/auth:latest
docker tag beeznez-api-gateway europe-west9-docker.pkg.dev/beeznez-446307/beeznez/api-gateway:latest
docker tag beeznez-client europe-west9-docker.pkg.dev/beeznez-446307/beeznez/client:latest
```

- Pousser chaque image vers GCP :

```bash
docker push europe-west9-docker.pkg.dev/beeznez-446307/beeznez/auth:latest
docker push europe-west9-docker.pkg.dev/beeznez-446307/beeznez/api-gateway:latest
docker push europe-west9-docker.pkg.dev/beeznez-446307/beeznez/client:latest
```

- Déployer chaque micro-service :

  - **auth**
    ```bash
    gcloud run deploy auth \
        --image=europe-west9-docker.pkg.dev/beeznez-446307/beeznez/auth:latest \
        --platform=managed \
        --region=europe-west9 \
        --allow-unauthenticated \
        --env-vars-file auth/env.yaml \
        --port=8081
    ```
  - **api-gateway**
    ```bash
    gcloud run deploy api-gateway \
        --image=europe-west9-docker.pkg.dev/beeznez-446307/beeznez/api-gateway:latest \
        --platform=managed \
        --region=europe-west9 \
        --allow-unauthenticated \
        --env-vars-file gateway/env.yaml \
        --port=3000
    ```
  - **client**

    ```bash
    gcloud run deploy client \
        --image=europe-west9-docker.pkg.dev/beeznez-446307/beeznez/client:latest \
        --platform=managed \
        --region=europe-west9 \
        --allow-unauthenticated \
        --env-vars-file client/env.yaml \
        --port=80
    ```

    - J'ai été contraint d'utiliser une autre region pour `client`, pour pouvoir utiliser un nom de domaine personnalisé. Ce n'était pas possible dans la region `europe-west9`.

    ```bash
    gcloud run deploy client \
        --image=europe-west9-docker.pkg.dev/beeznez-446307/beeznez/client:latest \
        --platform=managed \
        --region=europe-west1 \
        --allow-unauthenticated \
        --env-vars-file client/env.yaml \
        --port=80
    ```
