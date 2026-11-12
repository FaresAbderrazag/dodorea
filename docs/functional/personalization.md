# Personnalisation photo → héros

## Intention confirmée

Le parent importe une **photographie réelle** ; l'IA crée un personnage **dessin animé** dont les traits restent reconnaissables. Le prénom/pseudo est intégré au texte. La référence personnage est réutilisée dans les histoires.

## Contraintes fonctionnelles proposées

- Photo d'un seul sujet, nette et sans éléments sensibles visibles si possible.
- Confirmation explicite que le parent dispose du droit de fournir la photo ; notice claire sur destinataires, durée et suppression.
- Contrôles MIME réel, dimensions, poids, malware, métadonnées EXIF retirées, orientation normalisée.
- Prévisualisation du personnage avant validation ; maximum de tentatives configurable et transparent.
- Aucune reconnaissance faciale d'identité, comparaison biométrique ou déduction d'âge, origine ou autres attributs sensibles.
- Autorisé (validé par le responsable produit, 2026-11-11 ; confirmation juridique en T-501) : **détection de présence** d'un visage unique et net, comme simple contrôle de la photo, sans calcul ni stockage d'empreinte faciale (embedding), sans identification ni comparaison.
- La ressemblance photo ↔ personnage est jugée **par le parent** lors de la validation du héros, jamais par un score automatique de comparaison faciale. Le contrôle qualité des scènes (cohérence visage/cheveux) est humain ou porte sur les images dessinées entre elles, jamais sur la photo source.
- Aucune promesse de ressemblance parfaite.

## Modèle de référence

Une référence validée comprend asset dessiné, styleVersion, seed/paramètres non sensibles si fournisseur le permet, statut et lien au profil ; pas besoin de renvoyer la photo à chaque nouvelle histoire si le modèle autorise la référence illustrée.

## Génération d'une scène

Inputs : référence dessinée + scène validée + pose/vêtements + style guide + garde-fous. Output : illustration sans texte. Vérifier la cohérence manuellement pendant le pilote et via une grille de contrôle ensuite.

## Décisions ouvertes

Durée de conservation de la photo source, nombre de régénérations gratuites, validation parentale par livre ou par personnage, possibilité de plusieurs personnes et stratégie de correction des images.
