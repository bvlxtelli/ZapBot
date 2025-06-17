# gerar_tabela.py
import pandas as pd
import matplotlib.pyplot as plt
import sys
import os

#

titulo = 'teste'

def gerar_relatorio(loja):
    # Simulação: dados variam conforme o código da loja
    dados = {
        '123': {'Produto': ['Banana', 'Maçã'], 'Estoque': [10, 20]},
        '456': {'Produto': ['Café', 'Leite'], 'Estoque': [5, 15]},
    }

    if loja not in dados:
        print(f"Loja {loja} não encontrada")
        sys.exit(1)

    df = pd.DataFrame(dados[loja])

    fig, ax = plt.subplots(figsize=(6, 2))
    ax.axis('tight')
    ax.axis('off')
    ax.table(cellText=df.values, colLabels=df.columns, cellLoc='center', loc='center')

    os.makedirs('./relatorios/exports', exist_ok=True)
    caminho = f'./relatorios/exports/{titulo}_{loja}.pdf'
    plt.savefig(caminho, bbox_inches='tight')
    print(caminho)  # importante: imprime caminho para o Node.js ler

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python gerar_tabela.py <codigo_loja>")
        sys.exit(1)

    loja = sys.argv[1]
    gerar_relatorio(loja)