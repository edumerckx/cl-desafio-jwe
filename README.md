# cl-desafio-jwe


# geração de chave privada
openssl genpkey -algorithm RSA -out dev-private.pem -pkeyopt rsa_keygen_bits:2048


# geração de chave pública
openssl rsa -in dev-private.pem -pubout -out dev-public.pem
