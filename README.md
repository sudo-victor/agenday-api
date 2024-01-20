# Agendei

## Entidade

company {
  name: string;
  document: string;
  owner: User;
}

company_appointment_config {
  index_week_days: number[];
  start_business_hour: number;
  end_business_hour: number;
  start_date: Date;
  end_date: Date;
  appointment_interval: number;
}


user {
  name: string;
  role: "admin" | "customer" | "employee";
  email: string;
  phone?: string;
  document: string;
  password_hashed: string;
}

appointment {
  code: string;
  customer: User;
  scheduled_at: Date;
  canceled_at: null | Date;
  status: "pending" | "scheduled" | "canceled" | "finished";
}


## RF

### Criar uma conta
- Deve ser capaz de cadastrar:
  - companyName
  - companyDocument
  - name
  - role
  - email
  - phone
  - document
  - password
- Nao deve ser possível cadastrar uma empresa com o cnpj já registrado

### Configuraçao de horários
  - Os horários podem ser cadastrados por intervalos:
    - 15min
    - 30min
    - 1hr
  - Para programar os intervalos de horários é necessário selecionar/escolher qual o período de data de início e fim e horário de inicio e fim;
  - Deve ser capaz de definir quais dias da semana será válido


### Cadastrar usuários de uma empresa
- Deve ser capaz de cadastrar:
  - name
  - phone
  - email
  - document
  - documentType -> Automaticamente cpf
  - password
- Nao deve ser possível cadastrar um usuário com o cpf ou email já registrado

- Cadastrar os serviços
- Cadastrar um cliente
- Agendar algum serviço
- Cliente cancela um agendamento

## RFN

- Node
- Fastify
- Postgres (Prisma)
- Vitest
- Clean architecture