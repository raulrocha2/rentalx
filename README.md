**RF** => Requisios funcionais são os que contem as funcionalidades do sistema, exemplo o usuário pode cadastrar no sistema com e-mail e senha, pode alterar sua senha, somente um usuário administrador pode cadastrar os produtos.

**RNF** => Requisitos não funcionais. São os requisitos de desenvolvimento. exemplo o banco de dados precisa ser open source e com capacidade para grande volumes de dados como o Postgres. Precisar mandar um e-mail para confirmar um cadastro usando uma determinadad lib de envio de e-mail.

**RN** => Regra de negoicio. Exemplo cada usuário só pode ser cadastro com um unico e-mail, são regras exclusiva de cada empresa que deve estar presente no sistema.

# Devolução de carro
**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa deverá ser somado ao total do aluguel.