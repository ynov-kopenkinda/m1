import random

randnum = random.randint(1, 100)

lifes = 10

guesses = []

while lifes > 0:
    guess = int(input("Devine un nombre entre 1 et 100 : "))
    if guess in guesses:
        print("Tu as déjà deviné ce chiffre !")
        continue
    if guess == randnum:
        print("Tu as gagné !")
        break
    elif guess > randnum:
        print("Trop élévé !")
    else:
        print("Trop bas !")
    lifes -= 1
    print("Il te reste {} vies.".format(lifes))

if lifes == 0:
    print("Tu avs perdu ! Le numéro était {}.".format(randnum))
