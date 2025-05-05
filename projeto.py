def main():

    print("=== Calculadora de IMC ===")

    # Solicita os dados ao usuário
    peso = obter_valor_numerico("Digite seu peso (em kg): ")
    altura = obter_valor_numerico("Digite sua altura (em metros): ")

    # Calcula o IMC
    imc = calcular_imc(peso, altura)
     # Exibe o resultado
    print(f"\nSeu IMC é: {imc:.2f}")
    print(f"Classificação: {classificacao_imc(imc)}")

def calcular_imc(peso, altura):
    return peso / (altura ** 2)

def classificacao_imc(imc):
    """
    Retorna a classificação do IMC com base nos padrões da OMS.

    Parâmetros:
    imc (float): O valor do IMC calculado.

    Retorna:
    str: A classificação correspondente ao IMC.
    """
    if imc < 18.5:
        return "Abaixo do peso"
    elif imc < 24.9:
        return "Peso normal"
    elif imc < 29.9:
        return "Sobrepeso"
    elif imc < 34.9:
        return "Obesidade grau 1 (moderada)"
    elif imc < 39.9:
        return "Obesidade grau 2 (severa)"
    else:
        return "Obesidade grau 3 (mórbida)"

def obter_valor_numerico(mensagem):
    """
    Solicita ao usuário um número positivo e trata entradas inválidas.

    Parâmetros:
    mensagem (str): Mensagem exibida ao usuário.

    Retorna:
    float: O número inserido pelo usuário.
    """
    while True:
        try:
            valor = float(input(mensagem))  # Converte entrada para float
            if valor > 0:
                return valor  # Retorna se for válido
            print("O valor deve ser maior que zero. Tente novamente.")
        except ValueError:
            print("Entrada inválida. Digite um número válido.")

# Garante que o código só seja executado se for rodado diretamente
if __name__ == "__main__":
    main()



