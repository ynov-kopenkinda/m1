from models import Character


def main():
    character = Character()
    print(character)

    jane = Character("Jane")
    print(jane)

    jim = Character("Jim", 20)
    print(jim)

    joe = Character("Joe", 10, 0)
    print(joe)

    jill = Character("Jill", 10, 25, "axe")
    print(jill)

    character.speak("Hola")
    jane.speak("Agh!")
    jim.speak("I'm not Jim.")
    joe.speak("I'm not Jim too.")
    jill.speak("Hello, I'm Jill.")

    for i in range(10):
        jill.attack(joe, 25)

    joe.attack(jill, 25)


if __name__ == "__main__":
    main()
