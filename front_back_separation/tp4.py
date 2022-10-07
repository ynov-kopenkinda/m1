numbers = []

while True:
    number = input("Entrez un nombre entier (ou 'q' pour quitter): ")
    if number == "q":
        break
    if number not in numbers:
        numbers.append(int(number))

print("Liste des nombres: {}".format(numbers))
