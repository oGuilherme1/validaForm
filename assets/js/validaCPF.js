// 705.484.450-52 070.987.720-03
class ValidaCPF{
  constructor(cpfEnviado){
      Object.defineProperty(this, 'cpfLimpo', {
          writable: false,
          enumerable: true,
          configurable: false,
          value: cpfEnviado.replace(/\D+/g, '')
      });
  }

  sequencia(){
      return this.cpfLimpo[0].repeat(11) === this.cpfLimpo;
  }

  valida() {
      if(!this.cpfLimpo) return false;
      if(this.cpfLimpo.length !== 11) return false;
      if(typeof this.cpfLimpo !== 'string') return false;
      if(this.sequencia()) return 'CPF invalido, porque e uma sequencia';

      const cpfParcial = this.cpfLimpo.slice(0, -2);
      const digitoUm = ValidaCPF.criaDigito(cpfParcial);
      const digitoDois = ValidaCPF.criaDigito(cpfParcial + digitoUm);
      
      const novoCpf = cpfParcial + digitoUm + digitoDois;

      return novoCpf === this.cpfLimpo;

  }

  static criaDigito(cpfParcial){
      const cpfArray = Array.from(cpfParcial);
      let regressivo = cpfArray.length + 1;
      const total = cpfArray.reduce((ac, val) => {
          ac += (regressivo * Number(val));
          regressivo--;
          return ac
      }, 0)
      
      const digito =  11 - (total % 11);

      return digito > 9 ? '0' : String(digito);
  }
}

// let validacpf = new ValidaCPF('070.987.720-03');
// // validacpf = new ValidaCPF('999.999.999-99');

// if (validacpf.valida()) {
//   console.log('CPF válido');
// } else {
//   console.log('CPF inválido');
// }
