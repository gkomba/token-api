const express = require('express');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

// Permite receber JSON
app.use(express.json());

// A CHAVE TEM QUE SER IDENTICA À DO APP
const SECRET_KEY = Buffer.from("mR7tP3xL9sQ2vY1z"); // 16, 24 ou 32 bytes

// Função para descriptografar AES-ECB
function decrypt(token) {
    try {
        const encryptedBytes = Buffer.from(token, 'base64');

        const decipher = crypto.createDecipheriv('aes-128-ecb', SECRET_KEY, null);
        // ECB não usa IV
        decipher.setAutoPadding(true);

        let decrypted = decipher.update(encryptedBytes);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString('utf8');
    } catch (err) {
        return null;
    }
}

app.get('/', (req, res) => {
    res.send('API ONLINE');
});

// Rota /validate
app.post('/validate', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.json({ valid: 0 });
    }

    const decrypted = decrypt(token);

    if (!decrypted) {
        return res.json({ valid: 0 });
    }

    console.log('DECRYPTED:', decrypted);
    const parts = decrypted.split('#');

    const user = parts[1];

    console.log('USER:', user);
    const valid = `
aalbano
aamandio
aborges
acabutak
achivela
adala
adamiao
ade-melo
adias
adinis
adjigo
adraimun
adrmende
ahamuyel
ahuanga
ajacinto
ajudiao
akalenga
akemalan
akipuco
akudiezo
akupesa
alandre
alcarval
alde-jes
alditu
aldoming
aldos-sa
alealmei
aliberal
almanuel
almulond
aluis
aluzingu
amahina
amdos-sa
ancatela
angungun
annduani
ansebast
antmauri
antonfer
apascoal
aquima
aquintas
aquissan
aquissua
araimund
araul-jo
arenner
arfranci
aricosta
asassova
asebasti
asemente
asimao
asobrinh
asousa
asumbo
atambo
ateca
atiago
audoming
averissi
avsimao
badriano
bajoao
baraujo
bbenito
bdo-rosa
beandre
befranci
bemde-ca
bepereir
bernamar
bhange
bneto
bquissan
brandre
bsampaio
bsebasti
cananton
carloma2
cbarber
ccanga
cefelix
celias
cfilipe
cgama
cgouveia
choracio
cjeronim
ckulembe
cmatias
codili
cosvaldo
cquidia-
cramos
cramos-c
csamundi
csobrinh
ctati
ctete
ctuiango
daagosti
dadimend
dadmendo
dalde-ol
danmanue
darpimen
dcaliqui
dcamungu
dchissal
ddenadi
delferna
dgaspar
dgermano
diamda-s
djoao
dmanico
dmario
dmatuca
dnanyama
dngueze
dnzita
dosantos
dosvaldo
dsebasti
dvemba
eadriano
ealbino
ebastos
ebom-jes
ebunga-g
ecarneir
ecatimba
ecatoto
echilulu
edalexan
eda-mata
edfranci
edgomes
edijoao
edmmateu
edomateu
edpaquis
edsegred
eelundul
efamoros
efaustin
eferreir
efinda
elfranco
elimanue
elino
elneto
elsoares
emaafons
emalungo
emassala
ematari
emate
emjoao
emonteir
eneto
enobrega
epaulo
equaresm
equintas
eraimund
esoares
etchinhe
eteixeir
etgarcia
euquixin
eyuye
fanicola
fasacufu
fcalunhi
fdiando
fenambi
ferda-si
fevintem
fevunge
fguerra
fjilaias
flavseba
flgarcia
fmacau
fmalungo
fnicolau
fpanga
fquaresm
fsanjala
gbravo-f
gcoxi
gecarval
gemanuel
getchite
geteixei
gevictor
gilanton
gjunior
gkiala
gkomba
gmualeva
gomateus
gquina
gtchiten
gudos-sa
gumota
hbartolo
hbatalha
hcosta
hcuessec
helda-si
heluamba
hepanzo
hericsso
hesampai
hguengo
hmateque
hngola
hntyamba
hucamuoc
icatamba
idiarra
ieusebio
imazanga
imuondo
incunha
ivgama
jaalmeid
jacgarci
jalcatar
jamaral
jande-al
jbofengo
jbunga
jcamuenh
jcarvalh
jcassule
jda-cost
jda-cruz
jdias
jdomingo
jdos-sa2
jecanomb
jerpache
jgaspar
jitondo
jjambo
jluis
jmanuel
jmiguel
jmutumbu
jnzamu
joafigue
joandre
joaoda-2
joao-lpe
joaqmont
joeagost
joferrei
jofranci
johpasco
jorcarva
josefern
josemont
josmanue
jossebas
jpanzo
jpereira
jquicuma
jquissaq
jquitequ
jsamuel
jsoares
jsoxi
jtito
jtomas
juliados
kcoelho
kfragoso
kmatias
kpedro
lalfredo
lantonio
laurelio
lchauvin
leandre
lebernar
lfilipe
lfrancis
lgomes
lhabacuc
liedos-s
lisaraiv
lkingui
lleo
lleodev
llundage
lluzembo
lmachado
lmuapind
lnzila
lquimuan
lrafael
luqalmei
lusebast
luztorre
lvitorin
maalmeid
magoncal
makumili
mamiguel
mamirand
mamorais
manandre
manunda
maranto2
marcardo
marccarv
marcsilv
marimigu
marinmig
marmarco
marmigue
marpedro
maumonte
mausilva
mcabeto
mcaquart
mchingi
mchitund
mdingish
mdiniz
mebaptis
mebo
mefernan
mefranci
mfontes
mfukiaco
mhoque
mirberna
misalber
mjoaquim
mkumbi
mmanuel-
mmorais
mmuchimb
mmuzembe
mndunda
mojorge
mosantos
mpanzu
mpascoal
msalembe
mupinto
mvidal
nbalsa
nchimbel
neambriz
nfigueir
nkiampav
nmatondo
nmendes
obento
ofeverei
pagomes
parmando
pasambin
paulcard
paurodr2
pavelino
pavictor
pcapalan
pchitecu
pdunn
pechitec
pedmanue
pgaieta
pgaspar
pgomes
pquime
psidibe
ptchipoc
pvidro
pzamba
pzamite
pzau
qda-silv
rditutal
rgouveia
riolim
rjamba
rmarcos
rmuliata
rochimuc
rocorrei
rpedro
rquilami
rsambing
saalexan
sagostin
samcarva
saugusto
sbaptist
schivela
sda-cost
sde-carv
sdovala
sealbert
sedoming
sepaulo
sgaspar
sgonga
shcorrei
sigomes
sildos-s
sjoao
skantoni
smayunga
taguinal
tamanov
tarrais
tegomes
temanuel
tepedro
timatias
tsamuel-
tsanimbo
txavier
vdomingo
vlamiran
vleonel
vnanga
vroque
vtchali
waalexan
walbano
wfrancis
wmonteir
xjose
ylima
ysamutom
zcasimir
zombunga
`.trim().split('\n');
    return res.json({ valid: valid.includes(user) ? 1 : 0 });
});

// Trata erros de JSON inválido (ex: caracteres de controlo no body)
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.json({ valid: 0 });
    }
    next(err);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
