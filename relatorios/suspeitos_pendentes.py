import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from my_lib import *
from modules import gerar_pdf

titulo = 'suspeitos_pendentes'

dtmin = pd.to_datetime('01/01/1990', format='%d/%m/%Y', dayfirst=True)
dias = timedelta(days=2)
dtct = hoje - dias

def carregar_dados(a,b):

    bdsus = carregar_relatorio("db suspeitos")
    bdinv = a
    bdcg = b
    
    bdcg.columns = ['NUM_INV', 'DESCRICAO_INV', 'DATA_CG', 'FILIAL', 'DESC_FILIAL', 'CODIGO', 'DESCRICAO', 'NUM_SECAO', 'DESC_SECAO']

    bdsus = bdsus[['DATA', 'SOLICITADO', 'SUSPEITO', 'CODIGO', 'FILIAL']]
    bdinv = bdinv[['DPTO', 'SECAO', 'CODIGO', 'DESCRICAO', 'FILIAL', 'DATA_ULT_INV']]
    bdcg = bdcg[['DATA_CG', 'CODIGO', 'FILIAL']]

    bdg = bdsus.merge(bdinv, on=['CODIGO', 'FILIAL'])
    bdg = bdg.merge(bdcg, on=['CODIGO', 'FILIAL'], how='left')

    for col in ['DATA', 'DATA_ULT_INV', 'DATA_CG']:

        bdg[col] = pd.to_datetime(bdg[col], format='mixed', dayfirst=True)
        bdg[col] = bdg[col].dt.strftime('%d-%m-%Y')
        bdg[col] = pd.to_datetime(bdg[col], format='%d-%m-%Y', dayfirst=True)

    bdg['SITUACAO'] = np.where(
        (bdg['DATA_ULT_INV'] >= bdg['DATA']) & (~bdg['DPTO'].isna()), 'INV',
        np.where((bdg['DATA_CG'] > dtmin) & (~bdg['DPTO'].isna()), 'INV', 'NAO INV')
    )

    bdg = bdg[(bdg['DATA'] < ontem)]

    bdg = bdg.sort_values(by=['DPTO', 'SECAO', 'DESCRICAO'], ascending=True)

    return bdg

if __name__ == "__main__":
    
    if len(sys.argv) < 2:
        print(f"Uso: python {titulo}.py <codigo_loja>")
        sys.exit(1)

    loja = int(sys.argv[1])
    dados = carregar_dados(baixar_relatorio(1334), baixar_relatorio(1416))
    gerar_pdf(base=dados, loja=loja, title=f'{titulo}_{loja}')