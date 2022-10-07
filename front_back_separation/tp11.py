class Enterprise:
    name = ""
    employeesCount = 0
    turnover = 0.0
    enterpriseType: str

    def __init__(self, name, employeesCount, turnover, enterpriseType):
        self.name = name
        self.employeesCount = employeesCount
        self.turnover = turnover
        self.enterpriseType = enterpriseType

    def __repr__(self) -> str:
        return "L'entreprise {} a {} employés et un chiffre d'affaires de {}$.".format(self.name, self.employeesCount, self.turnover)


class MicroEnterprise(Enterprise):
    def __init__(self, name, employeesCount, turnover):
        super().__init__(name, employeesCount, turnover, "Micro-entreprise")


class SmallEnterprise(Enterprise):
    def __init__(self, name, employeesCount, turnover):
        if employeesCount is not None:
            super().__init__(name, employeesCount, turnover, "Petite entreprise")
        else:
            super().__init__(name, 6, turnover, "Petite entreprise")


class LargeEnterprise(Enterprise):
    montantCE: float

    def __init__(self, name, employeesCount, turnover, montantCE):
        if employeesCount is not None:
            super().__init__(name, employeesCount, turnover, "Grande entreprise")
        else:
            super().__init__(name, 50, turnover, "Grande entreprise")
        self.montantCE = montantCE


enterprises = {
    "micro": [],
    "small": [],
    "large": []
}


enterprise_amount = int(input("Nombre d'entreprises: "))
count = 0
classes = [MicroEnterprise, SmallEnterprise, LargeEnterprise]

while count < enterprise_amount:
    idx = count + 1
    enterpriseType = int(input(
        "[{}] Type d'entreprise (micro (1), small (2), large (3)): ".format(idx)))
    if enterpriseType not in [1, 2, 3]:
        print("Type d'entreprise invalide. Veuillez reesayer")
        continue
    name = input("[{}] Nom de l'entreprise: ".format(idx))
    employeesCount = int(input("[{}] Nombre d'employés: ".format(idx)))
    turnover = float(input("[{}] Chiffre d'affaires: ".format(idx)))
    toCreate = classes[enterpriseType - 1]
    if not enterpriseType == 3:
        enterprise = toCreate(name, employeesCount, turnover)
        enterprises["micro" if enterpriseType ==
                    1 else "small"].append(enterprise)
    else:
        montantCE = float(
            input("[{}] Montant de la contribution exceptionnelle: ".format(idx)))
        enterprise = toCreate(name, employeesCount, turnover, montantCE)
        enterprises["large"].append(enterprise)
    count += 1


for enterpriseType in enterprises:
    print("{}:".format(enterpriseType.capitalize()))
    for enterprise in enterprises[enterpriseType]:
        print(enterprise)
