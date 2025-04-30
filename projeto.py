def main():
    
    print("=== Calculadora de IMC ===")

    peso = obter_valor_numerico("Digite seu peso (em kg): ")
    altura = obter_valor_numerico("Digite sua altura (em metros): ")
    imc = calcular_imc(peso, altura)
