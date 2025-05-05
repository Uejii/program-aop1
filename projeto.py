#calculadora imc
print("=== Calculadora de IMC ===")
while True :
 peso = float(input("Digite seu peso em KG "))
 altura = float(input("Digite sua altura em metros "))
 imc = peso/(altura*altura)
 print("Seu IMC é:", round(imc, 2))
 repetir= input("Deseja calcular novamente? S/N  ")
 if repetir != "s" :
    print("Encerrando a aplicaçao, ate mais")
    break