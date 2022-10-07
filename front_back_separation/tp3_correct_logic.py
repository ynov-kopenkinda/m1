import random

randnum = random.randint(1, 100)

tries = 0

guesses = []

while True:
    guess = int(input("Devine un nombre entre 1 et 100 : "))
    if guess in guesses:
        print("Tu as déjà deviné ce chiffre !")
        continue
    guesses.append(guess)
    if guess == randnum:
        print("Tu as gagné en {} essais !".format(tries))
        break
    elif guess > randnum:
        print("Trop élévé !")
    else:
        print("Trop bas !")
    tries += 1
