user_input = int(input("Entrez un numero entre 1 et 3: "))


def choix1():
    print("Le choix est 1")


def autreChoix(p):
    return p in [2, 3]


if user_input == 1:
    choix1()
else:
    if autreChoix(user_input):
        print("L'autre choix est {}".format(user_input))
    else:
        print("Le choix est invalide")
