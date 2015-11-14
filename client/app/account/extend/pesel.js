var sprawdzenie_pesel = function(pesel)
{
    var wagi=[1, 3, 7, 9, 1, 3, 7, 9, 1, 3]; // wagi do okreslenie poprawnosci podanego PESEL
    var pesel = prompt("Podaj prosze swoj pesel");
    var suma=0; // suma kontrolna
    tmp=0 // zmienna - potrzbuje na chwile
    cyfra_kontrolna=0;
    
    if(pesel.length != 11)
    {
     console.log("Wprowadzono bledny numer PESEL");
    } 
    else
    {
        for (var i=0; i < (pesel.length-1); i++)
            {
            suma=suma + pesel[i] * wagi[i];
            }
            console.log("Suma kontrolna wynosi " + suma);
            tmp=suma%10;
            console.log(tmp);
            cyfra_kontrolna=10-tmp;
            console.log(cyfra_kontrolna);
            if (cyfra_kontrolna === pesel[11])
            {
                console.log("Podano prawidłowa cyfre ");
                }
    }
}
sprawdzenie_pesel();
