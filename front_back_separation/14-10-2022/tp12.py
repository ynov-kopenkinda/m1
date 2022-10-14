from typing import List


def menu() -> str:
    print("1. Ajouter une note")
    print("2. Afficher les notes")
    print("3. Afficher une note")
    print("4. Calculer la moyenne")
    print("q. Quitter")
    choix = input("Votre choix : ")
    if choix not in ['1', '2', '3', '4', 'q']:
        print("Choix invalide")
        return menu()
    return choix


notes: List[int] = []

while True:
    choix = menu()
    if choix == 'q':
        break
    elif choix == '1':
        try:
            note = int(input("Note : "))
            notes.append(note)
        except ValueError:
            print("Veuiilez entrer un nombre")
            continue
    elif choix == '2':
        print(notes)
    elif choix == '3':
        try:
            index = int(input("Index : "))
            print(notes[index])
        except ValueError:
            print("Veuiilez entrer un nombre")
            continue
        except IndexError:
            print("Index invalide")
            continue
    elif choix == '4':
        try:
            summ = 0
            for note in notes:
                summ += note
            print(summ / len(notes))
        except ZeroDivisionError:
            print("Aucune note enregistrée")

