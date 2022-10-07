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

