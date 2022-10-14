import random
import csv
from typing import List


temps_list = [random.randint(18, 25) for _ in range(30)]


def avg(l: List[int]):
    return sum(l)/len(l)


def show():
    for temp in sorted(temps_list):
        print("{}°C".format(temp))


def menu():
    print("1. Afficher les températures")
    print("2. Afficher la température moyenne")
    print("3. Afficher la température minimale")
    print("4. Afficher la température maximale")
    print("5. Sauvegarder les températures dans un fichier csv")
    print("q. Quitter")
    user_input = input("Votre choix: ")
    if user_input == "1":
        show()
    elif user_input == "2":
        print("Température moyenne: {}°C".format(avg(temps_list)))
    elif user_input == "3":
        print("Température minimale: {}°C".format(min(temps_list)))
    elif user_input == "4":
        print("Température maximale: {}°C".format(max(temps_list)))
    elif user_input == "5":
        try:
            with open("/Users/dk/Documents/studies/m1/front_back_separation/14-10-2022/tp16.csv", "w") as f:
                writer = csv.writer(f)
                for idx, temp in enumerate(temps_list):
                    writer.writerow([idx, temp])
        except:
            print("Erreur lors de la sauvegarde")
    elif user_input == "q":
        return False
    else:
        print("Choix invalide")
    return True


while menu():
    pass
