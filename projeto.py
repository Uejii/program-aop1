def main():
    
    print("=== Calculadora de IMC ===")

    peso = obter_valor_numerico("Digite seu peso (em kg): ")
    altura = obter_valor_numerico("Digite sua altura (em metros): ")
    imc = calcular_imc(peso, altura)
#calculadora imc
print("=== Calculadora de IMC ===") 
peso=float(input("Digite seu peso em KG"))
altura=float(input("Digite sua altura em metros"))
imc= peso/(altura*altura)
print ("seu imc é,", imc)