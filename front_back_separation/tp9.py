class Enterprise:
    name = ""
    employeesCount = 0
    turnover = 0.0

    def __init__(self, name, employeesCount, turnover):
        self.name = name
        self.employeesCount = employeesCount
        self.turnover = turnover

    def __repr__(self) -> str:
        return "L'entreprise {} a {} employés et un chiffre d'affaires de {}$.".format(self.name, self.employeesCount, self.turnover)


name = input("Nom de l'entreprise: ")
employeesCount = int(input("Nombre d'employés: "))
turnover = float(input("Chiffre d'affaires: "))

enterprise = Enterprise(name, employeesCount, turnover)

print(enterprise)
