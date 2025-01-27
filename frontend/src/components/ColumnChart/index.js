import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';
const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 20,
    borderColor: "#32383e",

    height: 360,
    background: "#121517"
  },

}));


const barChartOptions = {
  chart: {
    height: 350,
    type: 'bar'
  },

  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    }
  },

  tooltip: {
    y: {
      formatter: (value) => `${value.toFixed(2)} Unidades`, // Formata os valores no tooltip
    },
  },
  dataLabels: {
    enabled: false
  },

  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']

  },
  plotOptions: {
    bar: {
      colors: {
        ranges: [
          {
            from: -Infinity,
            to: 0,
            color: "#e0655c", // Cor para valores negativos
          },
          {
            from: 0.01,
            to: Infinity,
            color: "#33ee12", // Cor para valores positivos
          },
        ],
      },
    },
  },
  fill: {
    opacity: 1
  }
};

export default function ColumnChart({ data, dateRange }) {
  const theme = useTheme();
  const classes = useStyles();


  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState(barChartOptions);



  useEffect(() => {
    let groupedData;
    let categories;
   
  if (dateRange >= 90) {
    groupedData = reduceByMonth(data); // Agrupar por mês
    const monthsToShow = Math.ceil(dateRange / 30); // Número de meses baseado no dateRange
  categories = Array.from({ length: monthsToShow }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (monthsToShow - 1 - i)); // Meses retroativos
    return format(date, 'MM/yyyy'); // Formato MM/yyyy
  });
  } else {
    groupedData = reduceByDate(data); // Agrupar por dia
    categories = Array.from({ length: dateRange }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - ((dateRange - 1) - i)); // Cria uma data retroativa
      return format(date, 'dd/MM'); // Formato DD/MM
    });
  }

    // Obter as últimas 30 datas formatadas

   
    // Atualizar as séries e categorias do gráfico
    setSeries([
      {
        name: 'Lucro',
        data: Object.values(groupedData),
      },
    ]);

    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        categories: categories, // Use as datas formatadas como categorias
        labels: {
          style: {
            colors: Array(dateRange).fill(theme.palette.textPrimary),
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: theme.palette.textPrimary, // Cor dos valores no eixo Y
          },
          formatter: (value) => `${value.toFixed(2)}`
        },
      },
      colors: [theme.palette.primary.main], // Atualiza as cores do gráfico
    }));
  }, [data]);

  const reduceByMonth = (data) => {
    const today = new Date();
    const monthsAgo = new Date();
    monthsAgo.setMonth(today.getMonth() - Math.floor(dateRange / 30)); // Calcula o período com base no número de meses
  
    // Inicializar os lucros com os últimos meses
    const grouped = Array.from({ length: Math.ceil(dateRange / 30) }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - ((Math.ceil(dateRange / 30) - 1) - i)); // Calcula os meses retroativos
      return {
        date: format(date, 'MM/yyyy'), // Formata o mês/ano
        profit: 0,
      };
    }).reduce((acc, { date }) => {
      acc[date] = 0; // Inicializa com lucro 0
      return acc;
    }, {});
  
    // Processar os dados para somar os lucros nos últimos meses
    data.forEach((bet) => {
      const betDate = new Date(bet.appointmentDate);
      if (betDate >= monthsAgo && betDate <= today) {
        const monthKey = format(betDate, 'MM/yyyy'); // Usar o mês/ano como chave
  
        grouped[monthKey] = (grouped[monthKey] || 0) + Number((bet.profit / 10).toFixed(2));
      }
    });
  
    return Object.values(grouped); // Retorna os lucros organizados
  };

  const reduceByDate = (data) => {
    const today = new Date();
    const daysAgo = new Date();
    daysAgo.setDate(today.getDate() - dateRange);

    // Inicializar os lucros com as últimas 30 datas
    const grouped = Array.from({ length: dateRange }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - ((dateRange - 1) - i)); // Cria uma data retroativa
      return {
        date: format(date, 'dd/MM'), // Formata a data
        profit: 0,
      };
    }).reduce((acc, { date }) => {
      acc[date] = 0; // Inicializa com lucro 0
      return acc;
    }, {});

    // Processar os dados para somar os lucros nos últimos 30 dias
    data.forEach((bet) => {
      const betDate = new Date(bet.appointmentDate);
      if (betDate >= daysAgo && betDate <= today) {
        const dateKey = format(betDate, 'dd/MM'); // Usar a data formatada como chave

        grouped[dateKey] = (grouped[dateKey] || 0) + Number((bet.profit / 10).toFixed(2));
      }
    });

    return Object.values(grouped); // Retorna os lucros organizados
  };




  return (
    <Card className={classes.root} variant='outlined' >
      <CardHeader
        style={{ color: "#ffff" }}
        title="Gráfico de Lucro (em unidades)"
      />

      <CardContent>
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
          {options && (
            <ReactApexChart options={options} series={series} type="bar" height={240} />
          )}

        </Box>
      </CardContent>

    </Card>

  );
}

