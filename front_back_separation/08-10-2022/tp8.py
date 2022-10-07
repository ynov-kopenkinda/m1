import random

temps_list = [random.randint(18, 25) for _ in range(30)]

# temps_list = []
# while len(temps_list) < 31:
#     user_input = input(
#         "Température pour le jour {}: ".format(len(temps_list)+1))
#     if user_input == "q":
#         break
#     temps_list.append(int(user_input))


def avg(l):
    return sum(l)/len(l)


def show():
    for temp in sorted(temps_list):
        print("{}°C".format(temp))


def menu():
    print("1. Afficher les températures")
    print("2. Afficher la température moyenne")
    print("3. Afficher la température minimale")
    print("4. Afficher la température maximale")
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
    elif user_input == "q":
        return False
    else:
        print("Choix invalide")
    return True


while menu():
    pass
