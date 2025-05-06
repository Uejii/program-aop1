#calculadora imc jeofton 
print("=== Calculadora de IMC ===")
while True:
    try:
        peso = float(input("Digite seu peso em KG "))
        altura = float(input("Digite sua altura em metros "))
        imc = peso / (altura * altura)
        print("Seu IMC é:", round(imc, 2))
        peso_min = 18.5 * altura ** 2
        peso_max = 24.9 * altura ** 2 
        if imc < 18.5:
            print("Classificação: Abaixo do peso")
            print("Média de consumo calórico: ~2.200 kcal/dia")
        elif imc < 25:
            print("Classificação: Peso normal")
            print("Média de consumo calórico: ~2.500 kcal/dia")
        elif imc < 30:
            print("Classificação: Sobrepeso")
            print("Média de consumo calórico: ~2.800 kcal/dia")
        elif imc < 35:
            print("Classificação: Obesidade grau 1")
            print("Média de consumo calórico: ~3.000 kcal/dia")
        elif imc < 40:
            print("Classificação: Obesidade grau 2")
            print("Média de consumo calórico: ~3.200 kcal/dia")
        else:
            print("Classificação: Obesidade grau 3")
            print("Média de consumo calórico: ~3.500 kcal/dia")
        if peso < peso_min:
            diferenca = peso_min - peso
            print(f"Você precisa ganhar aproximadamente {diferenca:.2f} kg para atingir um IMC normal.")
        elif peso > peso_max:
            diferenca = peso - peso_max
            print(f"Você precisa perder aproximadamente {diferenca:.2f} kg para atingir um IMC normal.")
        else:
            print("Você já está dentro do intervalo de peso ideal.")
    except ValueError:
        print("Por favor, digite um número válido.")
        continue
    repetir = input("Deseja calcular novamente? S/N  ")
    if repetir.lower() != "s":
        print("Encerrando a aplicação, até mais")
        break
