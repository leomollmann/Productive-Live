abstract class SIUnit {
  public value: number
  public static unit: string
  
  constructor(value: number) {
    this.value = value
  }
}

export class Meter extends SIUnit {
  unit = 'M'
  constructor(value: number) {
    super(value)
  }
}

export class MeterSquared extends SIUnit {
  unit = 'M²'
}

export class Second extends SIUnit {  
  unit = 's'
}

export class Newton extends SIUnit {  
  unit = 'N'

  toPascal(area: MeterSquared) {
    return new Pascal(this.value / area.value)
  }
}

export class Joule extends SIUnit {
  unit = 'J'

  toWatt(seconds: Second) {
    return new Joule(this.value / seconds.value)
  }
}

export class Watt extends SIUnit {
  unit = 'W'

  toJoule(seconds: Second) {
    return new Joule(this.value * seconds.value)
  }
}

export class Pascal extends SIUnit {
  unit = 'Pa'

  toNewton(area: MeterSquared) {
    return new Newton(this.value * area.value)
  }
}

export class Liter extends SIUnit {
  unit = 'L'

  toLiterPerSecond(seconds: Second) {
    return new LiterPerSecond(this.value / seconds.value)
  }
}

export class LiterPerSecond extends SIUnit {
  unit = 'L/s'

  toLiter(seconds: Second) {
    return new Newton(this.value * seconds.value)
  }
}