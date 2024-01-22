export interface CustomerGatewayResponse {
  id: string
  name: string
  cpf: string
  email: string
}

export interface CustomerGateway {
  getById: (id: string) => Promise<CustomerGatewayResponse | null>
}
