import PropTypes, { object } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ReactApexChart from 'react-apexcharts';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
    borderColor: "#32383e",
    height: 360,
    background: "#121517",
  },
  chart: {
    "& .apexcharts-tooltip": {
      color: "#000000 !important"
    }
  }
}));

const pieChartOptions = {
  chart: {
    type: 'donut',
    height: 'auto',
    animations: {
      enabled: true,
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    }
  },
  stroke: {
    show: false
  },
  colors: ['#e6e6e6', '#0549b5', '#33ee12'],
  labels: [], // As labels serão definidas dinamicamente
  dataLabels: {
    enabled: false,


  },
  legend: {
    position: 'right',
    labels: {
      colors: '#fff',
    },
  },
  marker: {
    show: true,
  },
  tooltip: {
    style: {
      background: "#001100",
      fontSize: '15px'
    },
    y: {
      formatter: (value) => value.toFixed(2), // Arredonda o valor para 2 casas decimais
    },
  },
};

export default function PieChart({ data }) {
  const classes = useStyles();
  const [reducedBets, setReducedBets] = useState([]);
  const [options, setOptions] = useState(pieChartOptions);

  const reduceBetsProfit = (bets) => {
    const reduced = bets.reduce((acc, bet) => {
      const { sportName, profit } = bet;
      // Se o esporte ainda não estiver no acumulador, inicialize-o
      if (!acc[sportName]) {
        acc[sportName] = 0;
      }

      // Some o profit atual ao acumulador do esporte
      acc[sportName] += (profit/10);

      return acc;
    }, {});
    console.log("reduced",reduced)
    // Filtrando os esportes com lucro positivo, mas mantendo todos os esportes como labels
    const filtered = Object.keys(reduced).map((sport) => ({
      sport,
      profit: reduced[sport],
    }));
    
    return filtered;
  };
  useEffect(() => {
    const processedBets = reduceBetsProfit(data);
    const sortedBets = processedBets.sort((a, b) => b.profit - a.profit);

    setReducedBets(sortedBets);

    // Atualizando os rótulos com os nomes dos esportes
    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: processedBets.map(item => item.sport), // Mantendo todas as labels
    }));
  }, [data]);


  return (
    <>
      {reducedBets.length !== 0 && (
        <Card className={classes.root} variant="outlined">
          <CardHeader style={{ color: "#fff" }} title="Lucro por esporte" />
          <CardContent>
            <Box id="chart" sx={{ bgcolor: 'transparent' }}>
              <ReactApexChart
                className={classes.chart}
                options={options}
                series={reducedBets.filter(bet => bet.profit > 0).map(bet => bet.profit)}
                type="donut" />
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
}

