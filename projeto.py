import tkinter as tk
from tkinter import messagebox

def calcular():
    try:
        global peso, altura, imc, peso_min, peso_max, diferenca
        
        peso = float(entry_peso.get())
        altura = float(entry_altura.get())
        imc = peso / (altura * altura)
        peso_min = 18.5 * altura ** 2
        peso_max = 24.9 * altura ** 2 

        resultado = f"Seu IMC é: {round(imc, 2)}\n"

        if imc < 18.5:
            resultado += "Classificação: Abaixo do peso\nMédia de consumo calórico: ~2.200 kcal/dia"
        elif imc < 25:
            resultado += "Classificação: Peso normal\nMédia de consumo calórico: ~2.500 kcal/dia"
        elif imc < 30:
            resultado += "Classificação: Sobrepeso\nMédia de consumo calórico: ~2.800 kcal/dia"
        elif imc < 35:
            resultado += "Classificação: Obesidade grau 1\nMédia de consumo calórico: ~3.000 kcal/dia"
        elif imc < 40:
            resultado += "Classificação: Obesidade grau 2\nMédia de consumo calórico: ~3.200 kcal/dia"
        else:
            resultado += "Classificação: Obesidade grau 3\nMédia de consumo calórico: ~3.500 kcal/dia"

        if peso < peso_min:
            diferenca = peso_min - peso
            resultado += f"\nVocê precisa ganhar aproximadamente {diferenca:.2f} kg para atingir um IMC normal."
        elif peso > peso_max:
            diferenca = peso - peso_max
            resultado += f"\nVocê precisa perder aproximadamente {diferenca:.2f} kg para atingir um IMC normal."
        else:
            resultado += "\nVocê já está dentro do intervalo de peso ideal."

        messagebox.showinfo("Resultado", resultado)
    
    except ValueError:
        messagebox.showerror("Erro", "Por favor, digite um número válido.")

def novo_calculo():
    entry_peso.delete(0, tk.END)
    entry_altura.delete(0, tk.END)

# Interface gráfica
janela = tk.Tk()
janela.title("Calculadora de IMC")
janela.geometry("400x320")
janela.configure(bg="#e8f0fe")

tk.Label(janela, text="Calculadora de IMC", font=("Helvetica", 16, "bold"), bg="#e8f0fe").pack(pady=10)

frame = tk.Frame(janela, bg="#e8f0fe")
frame.pack(pady=10)

tk.Label(frame, text="Digite seu peso em KG:", font=("Helvetica", 12), bg="#e8f0fe").grid(row=0, column=0, sticky="e", padx=5, pady=5)
entry_peso = tk.Entry(frame, font=("Helvetica", 12))
entry_peso.grid(row=0, column=1, padx=5, pady=5)

tk.Label(frame, text="Digite sua altura em metros:", font=("Helvetica", 12), bg="#e8f0fe").grid(row=1, column=0, sticky="e", padx=5, pady=5)
entry_altura = tk.Entry(frame, font=("Helvetica", 12))
entry_altura.grid(row=1, column=1, padx=5, pady=5)

frame_botoes = tk.Frame(janela, bg="#e8f0fe")
frame_botoes.pack(pady=15)

tk.Button(frame_botoes, text="Calcular", font=("Helvetica", 12, "bold"), bg="#4CAF50", fg="white", command=calcular).grid(row=0, column=0, padx=10)
tk.Button(frame_botoes, text="Novo cálculo", font=("Helvetica", 12), bg="#f44336", fg="white", command=novo_calculo).grid(row=0, column=1, padx=10)

tk.Label(janela, text="Feito por Weslley e Julia", font=("Helvetica", 9), bg="#e8f0fe", fg="gray").pack(side="bottom", pady=5)

janela.mainloop()