from models import *

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
    if (len(enterprises[enterpriseType]) > 0):
        print("{}:".format(enterpriseType.capitalize()))
    for enterprise in enterprises[enterpriseType]:
        print(enterprise)
