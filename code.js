const express= require("express");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
const winston = require('winston');


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [


      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }


  const checkNumbers = (n1,n2,req,res) => {
  var flag = false
  try{
    if(isNaN(n1)) {
      logger.error("n1 is incorrect data");
      throw new Error("n1 incorrect data");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrect data");
        throw new Error("n2 incorrect data");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
    }
    flag = true; 
    logger.info(n1+' and '+n2+' are valid numbers ');
    return flag;
    } catch(error) {
    console.error(error)
    res.status(500).json({statuscocde:500, msg: error.toString() })
    return flag
    }
}

const add= (n1,n2) => {
    return n1+n2;
}

const sub= (n1,n2) => {
  return n1-n2;
}

const mul= (n1,n2) => {
  return n1*n2;
}

const div= (n1,n2) => {
  return n1/n2;
}

const exp = (n1, n2) => {
  return Math.pow(n1, n2);
}

const sqrt = (n1) =>{

return Math.sqrt(n1);
}

const mod = (n1, n2) => {
 return n1 % n2; 
}



app.get("/add", (req,res)=>{
    try{
      const n1= parseFloat(req.query.n1); 
      const n2= parseFloat(req.query.n2);
      logger.info('Parameters '+n1+' and '+n2+' received for addition');
      const flag = checkNumbers(n1,n2,req,res);
      if(flag == true)
      {
        const result = add(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
      }
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});


app.get("/sub", (req,res)=>{
    try{
     const n1= parseFloat(req.query.n1); 
     const n2= parseFloat(req.query.n2);
     logger.info('Parameters '+n1+' and '+n2+' received for substraction');
     const flag = checkNumbers(n1,n2,req,res);
     if(flag == true)
     {
      const result = sub(n1,n2);
      res.status(200).json({statuscocde:200, data: result }); 
     }
    } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});


app.get("/mul", (req,res)=>{
  try{
    const n1= parseFloat(req.query.n1); 
    const n2= parseFloat(req.query.n2);
    logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
    const flag = checkNumbers(n1,n2,req,res);
    if(flag == true)
    {
      const result = mul(n1,n2);
      res.status(200).json({statuscocde:200, data: result }); 
    }
  } catch(error) { 
     console.error(error)
     res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});


app.get("/div", (req,res)=>{
    try{
     const n1= parseFloat(req.query.n1); 
     const n2= parseFloat(req.query.n2);
     logger.info('Parameters '+n1+' and '+n2+' received for division');
     const flag = checkNumbers(n1,n2,req,res);
     if(flag == true)
     {
       const result = div(n1,n2);
       res.status(200).json({statuscocde:200, data: result }); 
     }
    } catch(error) { 
       console.error(error)
       res.status(500).json({statuscocde:500, msg: error.toString() })
    }
  });


app.get("/exp", (req, res) => handleOperation(req, res, exp, "exponentiation"));

        function handleOperation(req, res, operation, operationName) {
            try {
                const n1 = parseFloat(req.query.n1);
                const n2 = parseFloat(req.query.n2);
                logger.info(`Parameters ${n1} and ${n2} received for ${operationName}`);
                if (checkNumbers(n1, n2, req, res)) {
                    const result = operation(n1, n2);
                    res.status(200).json({ statuscode: 200, data: result });
                }
            } catch (error) {
                logger.error(error);
                res.status(500).json({ statuscode: 500, msg: error.toString() });
            }
        }


app.get("/sqrt", (req, res) => handleSqrt(req, res));

function handleSqrt(req, res) {
    try {
        const n1 = parseFloat(req.query.n1);
        logger.info(`Parameter ${n1} received for square root`);
        if (checkNumbers(n1, 0, req, res)) {
            const result = sqrt(n1);
            res.status(200).json({ statuscode: 200, data: result });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
}


app.get("/mod", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        logger.info(`Parameters ${n1} and ${n2} received for modulo`);
        if (checkNumbers(n1, n2, req, res)) {
            const result = mod(n1, n2);
            res.status(200).json({ statuscode: 200, data: result });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});


const port=3000;
app.listen(port,()=> {
    console.log("hello i'm listening to port " +port);
});