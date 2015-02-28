module.exports = {
	precision: 4,
	output: function(ans) {
		return Math.round(ans * Math.pow(10, this.precision)) / Math.pow(10, this.precision);
	},
	mean: function(x) {
		var sum = 0;
		var cnt = 0;
		x.forEach(function(y, i){
			sum += y;
			cnt += 1;
		});
		return this.output(sum / cnt);
	},
	std: function(x) {
		var mu = this.mean(x);
		var sum = 0;
		var cnt = 0;
		x.forEach(function(y, i){
			sum += Math.pow((y - mu), 2);
			cnt += 1;
		});
		var ans = Math.sqrt(sum / (cnt - 1));
		return this.output(ans);
	}
};