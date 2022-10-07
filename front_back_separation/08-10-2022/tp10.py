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

    def display(self) -> None:
        print("L'entreprise {} a {} employés et un chiffre d'affaires de {}$.".format(
            self.name, self.employeesCount, self.turnover))


enterprises = []
enterprise_amount = int(input("Nombre d'entreprises: "))


for _ in range(enterprise_amount):
    name = input("[{}] Nom de l'entreprise: ".format(_ + 1))
    employeesCount = int(input("[{}] Nombre d'employés: ".format(_ + 1)))
    turnover = float(input("[{}] Chiffre d'affaires: ".format(_ + 1)))

    enterprise = Enterprise(name, employeesCount, turnover)
    enterprises.append(enterprise)

for enterprise in enterprises:
    enterprise.display()
