#calculadora imc jeofton 
print("=== Calculadora de IMC ===")
while True:
    try:
        peso = float(input("Digite seu peso em KG "))
        altura = float(input("Digite sua altura em metros "))
        imc = peso / (altura * altura)
        print("Seu IMC é:", round(imc, 2))
        
        if imc < 18.5:
            print("Classificação: Abaixo do peso")
        elif imc < 25:
            print("Classificação: Peso normal")
        elif imc < 30:
            print("Classificação: Sobrepeso")
        elif imc < 35:
            print("Classificação: Obesidade grau 1")
        elif imc < 40:
            print("Classificação: Obesidade grau 2")
        else:
            print("Classificação: Obesidade grau 3")
    except ValueError:
        print("Por favor, digite um número válido.")
        continue
    
    repetir = input("Deseja calcular novamente? S/N  ")
    if repetir.lower() != "s":
        print("Encerrando a aplicação, até mais")
        break