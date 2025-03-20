document.addEventListener('DOMContentLoaded', () => {
    window.generateInterpretation = function() {
        const scores = {
            pp1: parseInt(document.getElementById('pp1').value) || 0,
            pp2: parseInt(document.getElementById('pp2').value) || 0,
            wa1: parseInt(document.getElementById('wa1').value) || 0,
            wa2: parseInt(document.getElementById('wa2').value) || 0,
            ci1: parseInt(document.getElementById('ci1').value) || 0,
            ci2: parseInt(document.getElementById('ci2').value) || 0,
            am1: parseInt(document.getElementById('am1').value) || 0,
            am2: parseInt(document.getElementById('am2').value) || 0,
            gb1: parseInt(document.getElementById('gb1').value) || 0,
            gb2: parseInt(document.getElementById('gb2').value) || 0,
            ti1: parseInt(document.getElementById('ti1').value) || 0,
            ti2: parseInt(document.getElementById('ti2').value) || 0
        };

        // Calculate In-Out and Left-Right scores
        const inOutScores = {
            pp: (scores.pp1 + scores.pp2) / 2,
            wa: (scores.wa1 + scores.wa2) / 2,
            ci: (scores.ci1 + scores.ci2) / 2,
            am: (scores.am1 + scores.am2) / 2,
            gb: (scores.gb1 + scores.gb2) / 2,
            ti: (scores.ti1 + scores.ti2) / 2
        };

        const leftRightScores = {
            pp: scores.pp2 - scores.pp1,
            wa: scores.wa2 - scores.wa1,
            ci: scores.ci2 - scores.ci1,
            am: scores.am2 - scores.am1,
            gb: scores.gb2 - scores.gb1,
            ti: scores.ti2 - scores.ti1
        };

        const interpretations = {
            inOut: {
                0: "Introvert",
                3: "Moderately Introverted",
                5: "Balanced",
                7: "Moderately Extroverted",
                10: "Extrovert"
            },
            leftRight: {
                '-10': "Extreme Resistance - Completely fixed perspective",
                '-5': "Strong Resistance - Resistant to change",
                '0': "Balanced - No clear leaning",
                '5': "Strong Influence - Open to change",
                '10': "Extreme Influence - Overly adaptive, easily swayed"
            }
        };

        function getInterpretation(score, type) {
            if (type === 'inOut') {
                if (score <= 2) return interpretations.inOut[0];
                if (score <= 4) return interpretations.inOut[3];
                if (score <= 6) return interpretations.inOut[5];
                if (score <= 8) return interpretations.inOut[7];
                return interpretations.inOut[10];
            }

            if (type === 'leftRight') {
                if (score <= -7) return interpretations.leftRight['-10'];
                if (score <= -3) return interpretations.leftRight['-5'];
                if (score <= 2) return interpretations.leftRight['0'];
                if (score <= 6) return interpretations.leftRight['5'];
                return interpretations.leftRight['10'];
            }
        }

        const categories = ['pp', 'wa', 'ci', 'am', 'gb', 'ti'];
        categories.forEach(cat => {
            // In-Out Scores and Interpretation
            document.getElementById(`${cat}-score`).innerText = inOutScores[cat].toFixed(1);
            document.getElementById(`${cat}-interpretation`).innerText = getInterpretation(inOutScores[cat], 'inOut');

            // Left-Right Scores and Interpretation
            document.getElementById(`${cat}-left-right-score`).innerText = leftRightScores[cat].toFixed(1);
            document.getElementById(`${cat}-left-right-interpretation`).innerText = getInterpretation(leftRightScores[cat], 'leftRight');
        });
    };
});
