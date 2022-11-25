# Les garagistes du sud

## Contexte

Le garage ‘LesGaragistesDuSud’ a pour activité principale la réparation et la vente de
véhicule en tout genre. Une application web existe déjà pour gérer ces deux activités.
Aujourd’hui, le garage souhaite étendre ses activités en y ajoutant la location des véhicules
présent dans le garage. Pour cela, il aimerait avoir à disposition une application Web
différente des activités principales (réparation et vente). Cette application Web doit
uniquement gérer la partie « location des véhicules », être responsive et moderne.

## Installation

> Attention, il est nécessaire d'avoir installé NodeJS et NPM sur votre machine.

- Back-end (dans un terminal)
  - `pip install -r requirements.txt` pour installer les dépendances
  - `python manage.py migrate` pour créer la base de données
  - `python manage.py runscript seed` pour créer les données de test
  - `python manage.py runserver` pour lancer le serveur
- Front-end
  - `cd renting-front` pour se rendre dans le dossier du front
  - `npm install` pour installer les dépendances
  - `npm run dev` pour lancer le serveur

## Utilisation

Vous avez par defaut 2 utilisateurs admin:
| login | password |
|--------|--------|
| admin1 | admin1 |
| admin2 | admin2 |

et 3 utilisateurs clients:
| login | password |
|--------|--------|
| rider1 | rider1 |
| rider2 | rider2 |
| rider3 | rider3 |

## Annexes

Petite remarque, j'ai decidé d'utiliser une librarie pour le routing qui est en beta pour l'instant, du coup parfois le redirect se fait pas tout seul, il faut rafraichir la page pour que ca marche.
