from models import Character, Level


characters = []


def choose_character() -> Character:
    for i, character in enumerate(characters):
        print(f"{i + 1}. {character.name}")
    user_input = int(input("Choose a character: "))
    if user_input > len(characters) or user_input < 1:
        print("Invalid choice.")
        return choose_character()
    return characters[user_input - 1]


def character_action():
    chosen = choose_character()
    while True:
        print("\n\n")
        print("1. Attack")
        print("2. Speak")
        print("q. Exit")
        user_input = input("Votre choix?: ")
        if user_input == "q":
            return
        if user_input == "1":
            if len(characters) < 2:
                print("Not enough characters.")
                return
            attacked = choose_character()
            if attacked == chosen:
                print("Can't attack yourself.")
                return
            dmg = int(input("Damage?: "))
            chosen.attack(attacked, dmg)
        if user_input == "2":
            message = input("What do you want the character to say?: ")
            chosen.speak(message)
            return


def game() -> bool:
    print("1. Create a character")
    print("2. Action")
    print("q. Exit")
    user_input = input("Votre choix?: ")
    if user_input == "q":
        return False
    if user_input == "1":
        name = input("Name?: ")
        force = int(input("Force?: "))
        weapon = input("Weapon?: ")
        character = Character(name, 2, force, weapon, Level.STARTER)
        characters.append(character)
        print(character)
    if user_input == "2":
        character_action()
    return True


def main():
    while game():
        pass


if __name__ == "__main__":
    main()
