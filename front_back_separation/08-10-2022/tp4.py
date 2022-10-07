numbers = []

while True:
    number = input("Entrez un nombre entier (ou 'q' pour quitter): ")
    if number == "q":
        break
    if int(number) in numbers:
        continue
    numbers.append(int(number))

print("Liste des nombres: {}".format(numbers))
