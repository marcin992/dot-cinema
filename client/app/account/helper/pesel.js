var checkPesel = function(pesel) {
    var reg = /^[0-9]{11}$/;
	
    if(reg.test(pesel) == true && pesel.length == 11) {
		var arr = [1,3,7,9,1,3,7,9,1,3];
		var sum = 0;

		for (var i = 0; i < 10; i++) {
			sum += arr[i] * y[i];
		}

		sum = sum%10 == 0 ? 0 : 10-sum%10;
        return sum == y[10];
	}
	
	return false;
}
