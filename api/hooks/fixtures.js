var currenciesFixture = [
  {
    name: 'Bitcoin',
    abbreviation: 'BTC',
    symbol: '\uf15a',
    type: 'sha256'
  },
  {
    name: 'Litecoin',
    abbreviation: 'LTC',
    symbol: 'L'
  },
  {
    name: 'Dollar',
    abbreviation: 'USD',
    symbol: '$'
  }
];

var devicesFixture = [
  {
    name: 'EC2 Micro',
    manufacturer: 'Amazon',
    website: 'https://amazon.com',
    hashRate: 0,
    power: 0
  },
  {
    name: 'Antminer S1',
    manufacturer: 'Bitmain',
    website: 'https://bitmaintech.com',
    hashRate: 180,
    power: 360
  },
  {
    name: 'Antminer S2',
    manufacturer: 'Bitmain',
    website: 'https://bitmaintech.com',
    hashRate: 1000,
    power: 1100
  },
  {
    name: 'Antminer S3',
    manufacturer: 'Bitmain',
    website: 'https://bitmaintech.com',
    hashRate: 441,
    power: 355
  },
  {
    name: 'Antminer S3+',
    manufacturer: 'Bitmain',
    website: 'https://bitmaintech.com',
    hashRate: 453,
    power: 355
  },
  {
    name: 'Antminer S4',
    manufacturer: 'Bitmain',
    website: 'https://bitmaintech.com',
    hashRate: 2016,
    power: 1399
  },
  {
    name: 'Antminer C1',
    manufacturer: 'Bitmain',
    website: 'https://bitmaintech.com',
    hashRate: 1008,
    power: 800
  },
  {
    name: 'Antminer S5',
    manufacturer: 'Bitmain',
    website: 'https://bitmaintech.com',
    hashRate: 1155,
    power: 590
  },
  {
    name: 'Antminer U3',
    manufacturer: 'Bitmain',
    website: 'https://bitmaintech.com',
    hashRate: 63,
    power: 65
  },
  {
    name: 'SP10',
    manufacturer: 'Spondoolies',
    website: 'http://www.spondoolies-tech.com',
    hashRate: 1400,
    power: 1250
  },
  {
    name: 'SP20',
    manufacturer: 'Spondoolies',
    website: 'http://www.spondoolies-tech.com',
    hashRate: 1700,
    power: 1100
  },
  {
    name: 'SP35',
    manufacturer: 'Spondoolies',
    website: 'http://www.spondoolies-tech.com',
    hashRate: 6000,
    power: 3500
  },
  {
    name: 'Neptune',
    manufacturer: 'KnC',
    website: 'https://www.kncminer.com',
    hashRate: 3000,
    power: 1950
  },
  {
    name: 'Neptune Mini',
    manufacturer: 'KnC',
    website: 'https://www.kncminer.com',
    hashRate: 1500,
    power: 975
  },
  {
    name: 'TerraMiner IV',
    manufacturer: 'Cointerra',
    website: 'https://cointerra.com',
    hashRate: 1600,
    power: 2100
  }
];

var poolsFixture = [
  {
    name: 'ghash.io',
    url: 'stratum+tcp://us1.ghash.io:3333'
  },
  {
    name: 'Antpool',
    url: 'p2p.antpool.com:3333'
  },
  {
    name: 'F2Pool (Discus Fish)',
    url: 'stratum+tcp://stratum.f2pool.com:3333'
  },
  {
    name: 'Eligius',
    url: 'stratum+tcp://stratum.mining.eligius.st:3334'
  },
  {
    name: 'BTC Guild',
    url: 'stratum+tcp://stratum.btcguild.com:3333'
  },
  {
    name: 'BitcoinCZ (Slush)',
    url: 'stratum+tcp://stratum.bitcoin.cz:3333'
  },
  {
    name: 'Polmine',
    url: 'stratum+tcp://api.polmine.pl:8361'
  },
  {
    name: 'Bitminter',
    url: 'stratum+tcp://mint.bitminter.com:3333'
  }
];

module.exports = function (sails) {
  return {
    initialize: function (next) {
      sails.after('hook:orm:loaded', function () {
        Promise.all([
            loadDevices(),
            loadPools(),
            loadCurrencies()
          ])
          .then(function () {
            next();
          })
          .catch(function (error) {
            next();
          });

      });
    }
  };
};

function loadDevices () {
  return Promise.all(_.map(devicesFixture, function (device) {
    return MinerDevice.create(device);
  }));
}

function loadPools () {
  return Promise.all(_.map(poolsFixture, function (pool) {
    return Pool.create(pool);
  }));
}

function loadCurrencies () {
  return Promise.all(_.map(currenciesFixture, function (currency) {
    return Currency.create(currency);
  }));
}
