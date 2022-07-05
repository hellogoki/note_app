const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');
let tarih = new Date();

yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevTamamlaSil);
document.addEventListener('DOMContentLoaded', localStorageOku);

function gorevTamamlaSil(e) {
    const tiklanilanEleman = e.target;

    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')) {
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
    }
    if(tiklanilanEleman.classList.contains('gorev-btn-sil')) {

        if(confirm('Silmek İstediğinize Emin Misiniz?')) {
            tiklanilanEleman.parentElement.classList.toggle('kaybol');
            // toggle -> varsa siler yoksa ekler
            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            localStorageSil(silinecekGorev);

            tiklanilanEleman.parentElement.addEventListener('transitionend', function(){
            // eventListener orda bi event varsa bitmesini bekliyo sonra remove kodunu çalıştırıyor.
                tiklanilanEleman.parentElement.remove();
            });
        }
 
    }
}
function gorevEkle(e) {  
    e.preventDefault();
    if (yeniGorev.value === '' ){ // ya da (yeniGorev.valu.length < 1) kullanılabilir.
        alert('Lütfen Bir Görev Giriniz.');
    }
    else {
        // LOCAL STORAGE KAYDET 
        gorevItemOlustur(yeniGorev.value);
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = '';
    }
}
function localStorageArrayeDonustur() {
    let gorevler;
    if(localStorage.getItem('gorevler') === null) {
        gorevler = [];  
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    return gorevler;
}
function localStorageKaydet(yeniGorev) {   
    let gorevler = localStorageArrayeDonustur();
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}
function localStorageOku() {
    let gorevler = localStorageArrayeDonustur(); 
    if(gorevler != null ) {
        gorevler.forEach(function(gorev) {
        gorevItemOlustur(gorev);  
    });
    }
}
function localStorageSil(gorev) {
    let gorevler = localStorageArrayeDonustur();   
    const silinecekGorevIndex = gorevler.indexOf(gorev);
    gorevler.splice(silinecekGorevIndex, 1); // SPLICE ILE ITEM SIL  
    localStorage.setItem('gorevler', JSON.stringify(gorevler)); // görev silinmiş arrayin geri local storage'a atılması.
}
function gorevItemOlustur(gorev) {
     // DIV OLUSTURMA
     const gorevDiv = document.createElement('div');
     gorevDiv.classList.add('gorev-item'); // div classlarını olusturma. 
     // LI OLUSTURMA
     const gorevLi = document.createElement('li');
     gorevLi.classList.add('gorev-tanim');
     gorevLi.innerText = gorev;
     gorevDiv.appendChild(gorevLi);
     // li
     const tarihLi = document.createElement('li');
     tarihLi.classList.add('tarih-tanim');
     tarihLi.innerText =(tarih.getDate() +'/'+ (tarih.getMonth() + 1) + '/'+ tarih.getFullYear());
     gorevDiv.appendChild(tarihLi);
     // TAMAMLANDI BUTONU EKLE
     const gorevTamamBtn = document.createElement('button');
     gorevTamamBtn.classList.add('gorev-btn');
     gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
     gorevTamamBtn.innerHTML = '<i class="fa-regular fa-square-check"></i>';
     gorevDiv.appendChild(gorevTamamBtn);
     // Sil BUTONU EKLE
     const gorevSilBtn = document.createElement('button');
     gorevSilBtn.classList.add('gorev-btn');
     gorevSilBtn.classList.add('gorev-btn-sil');
     gorevSilBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
     gorevDiv.appendChild(gorevSilBtn);    
     // UL'YE OLUSTURDUGUMUZ DIV'I EKLEME
     gorevListesi.appendChild(gorevDiv);
}

