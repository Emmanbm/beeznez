import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const RGPD = () => {
  return (
    <Box padding={2}>
      <Typography variant='h4' align='center' gutterBottom>
        Politique de Confidentialité et RGPD
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' gutterBottom>
          ARTICLE 1 : PRÉAMBULE
        </Typography>
        <Typography>
          Cette politique de confidentialité s'applique au site{" "}
          <Link to='/'>BeeZnez</Link>. Elle a pour objectif de décrire la
          manière dont vos données personnelles sont collectées et traitées
          lorsque vous utilisez notre site. Nous attachons une grande importance
          à la confidentialité de vos données personnelles et nous engageons à
          les protéger conformément au Règlement Général sur la Protection des
          Données (RGPD).
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' gutterBottom>
          ARTICLE 2 : PRINCIPES RELATIFS À LA COLLECTE ET AU TRAITEMENT DES
          DONNÉES PERSONNELLES
        </Typography>
        <Typography>
          Conformément au RGPD, la collecte et le traitement des données
          personnelles respectent les principes suivants :
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Licéité, loyauté et transparence :</strong> Vos données
              personnelles sont collectées et traitées uniquement dans un cadre
              légal, loyal et transparent.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Finalités déterminées :</strong> Vos données sont
              collectées pour répondre à des objectifs précis, explicites et
              légitimes.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Minimisation des données :</strong> Nous collectons
              uniquement les données nécessaires à nos finalités.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Limitation de conservation :</strong> Vos données sont
              conservées uniquement pendant la durée nécessaire à nos finalités.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Confidentialité et sécurité :</strong> Vos données sont
              protégées contre tout accès non autorisé.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' gutterBottom>
          ARTICLE 3 : DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES DANS
          LE CADRE DE LA NAVIGATION SUR LE SITE
        </Typography>
        <Typography>
          Les données personnelles collectées sur le site BeeZnez sont les
          suivantes :
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Données obligatoires :</strong> nom, prénom, email, moyens
              de paiement (compte PayPal ou carte bancaire).
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Données facultatives :</strong> numéro de téléphone,
              adresse, date de naissance.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Données automatiquement collectées :</strong> préférences
              de thème (clair ou sombre).
            </Typography>
          </li>
        </ul>
        <Typography>Ces données sont essentielles pour :</Typography>
        <ul>
          <li>
            <Typography>
              Assurer une expérience personnalisée sur le site.
            </Typography>
          </li>
          <li>
            <Typography>
              Gérer les paiements et sécuriser les transactions.
            </Typography>
          </li>
          <li>
            <Typography>
              Améliorer nos services en comprenant vos préférences.
            </Typography>
          </li>
        </ul>
        <Typography>
          La durée de conservation des données est la suivante :
        </Typography>
        <ul>
          <li>
            <Typography>
              Données personnelles : 3 ans après la dernière activité sur le
              site.
            </Typography>
          </li>
          <li>
            <Typography>
              Données relatives aux transactions : 5 ans pour des raisons
              légales et fiscales.
            </Typography>
          </li>
          <li>
            <Typography>
              Données des préférences de thème : conservées tant que
              l'utilisateur est actif.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' gutterBottom>
          ARTICLE 4 : RESPONSABLE DU TRAITEMENT DES DONNÉES ET DÉLÉGUÉ À LA
          PROTECTION DES DONNÉES
        </Typography>
        <Typography>
          Le responsable du traitement des données personnelles est : Emmanuel
          BOIKA. Vous pouvez le contacter à l'adresse suivante :{" "}
          <a href='mailto:emmanboyka@gmail.com'>emmanboyka@gmail.com</a>.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' gutterBottom>
          ARTICLE 5 : LES DROITS DE L’UTILISATEUR EN MATIÈRE DE COLLECTE ET DE
          TRAITEMENT DES DONNÉES
        </Typography>
        <Typography>
          Conformément au RGPD, vous disposez des droits suivants :
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Droit d'accès :</strong> Vous pouvez demander à consulter
              vos données personnelles.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Droit de rectification :</strong> Vous pouvez demander la
              modification ou la mise à jour de vos données.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Droit à l'effacement :</strong> Vous pouvez demander la
              suppression de vos données personnelles.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Droit d'opposition :</strong> Vous pouvez refuser le
              traitement de vos données dans certains cas.
            </Typography>
          </li>
        </ul>
        <Typography>
          Pour exercer ces droits, contactez-nous à l'adresse :{" "}
          <a href='mailto:emmanboyka@gmail.com'>emmanboyka@gmail.com</a>.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' gutterBottom>
          ARTICLE 6 : CONDITIONS DE MODIFICATION DE LA POLITIQUE DE
          CONFIDENTIALITÉ
        </Typography>
        <Typography>
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment pour nous conformer aux évolutions
          législatives ou pour améliorer nos services. Toute modification sera
          communiquée aux utilisateurs via une notification sur le site.
        </Typography>
      </Box>
    </Box>
  );
};

export default RGPD;
