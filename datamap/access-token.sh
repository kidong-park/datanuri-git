curl -k -X POST -d "client_id=platform&client_secret=a329cb95-8141-4a38-93c9-b81dc2a91268&grant_type=password&username=$1&password=so8087" https://keycloak-web-58-181-37-175.nip.io:7002/auth/realms/master/protocol/openid-connect/token | json_pp
