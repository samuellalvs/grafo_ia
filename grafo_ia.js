
var grafo = [];
var arestas = [];
var vertices = 2;
var matriz_arestas = [];

function rundjik() {
    ini = parseInt(prompt("Digite o vertice inicial"));
    fim = parseInt(prompt("Digite o vertice final"));
    dijkstra(ini, fim);
}

function setGrafo() {
    if ($('#qtd_vertices').val() > 20 || $('#qtd_vertices').val() == 0) {
        val = 20;
    } else {
        val = $('#qtd_vertices').val();
    }
    criar_grafo(val);
    $('#vert').hide();
    $('#btndjk').show();
    $('#inicio_fim').show();
    $('#ini-fim').show();
    $('#btnmatriz').show();
}

function setAresta() {
    ver1 = $('#inicio').val();
    ver2 = $('#fim').val();
    $('#inicio').val('');
    $('#fim').val('');
    criar_aresta(parseInt(ver1), parseInt(ver2));
    arestas.forEach(aresta => {
        var div1 = $(`#vertice-${aresta.origem}`);
        var div2 = $(`#vertice-${aresta.destino}`);
        var x1 = div1.offset().left + (div1.width() / 2);
        var y1 = div1.offset().top + (div1.height() / 2);
        var x2 = div2.offset().left + (div2.width() / 2);
        var y2 = div2.offset().top + (div2.height() / 2);
        connectDots(x1, y1, x2, y2);
    });
}


function connectDots(xA, yA, xB, yB) {
    var a = document.createElement("div");
    var r = 180 * Math.atan2(yB - yA, xB - xA) / Math.PI;
    a.setAttribute("style", "width:" + Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2)) + "px;height:2px;position:absolute;background-color:black;top:" + yA + "px;left:" + xA + "px;-moz-transform:rotate(" + r + "deg);-moz-transform-origin:0px 0px;-webkit-transform:rotate(" + r + "deg);-webkit-transform-origin:0px 0px;transform:rotate(" + r + "deg);transform-origin:0px 0px;-ms-transform:rotate(" + r + "deg);-ms-transform-origin:0px 0px;");
    document.body.appendChild(a);
}

function criar_grafo(num_vertices) {
    $('.linha-cima').html('');
    $('.linha-baixo').html('')
    let i = 1;
    while (i <= num_vertices) {
        if (i % 2 != 0) {
            grafo.push([1, i]);
            $('.linha-cima').append(`<div class="vertice" id="vertice-${i}" style="z-index:10; margin-right:16px"><span class="vertice-text">${i}</span></div>`)
        } else {
            grafo.push([0, i]);
            $('.linha-baixo').append(`<div class="vertice" id="vertice-${i}" style="z-index:10; margin-right:16px"><span class="vertice-text">${i}</span></div>`)
        }
        i++;
    }

    vertices = num_vertices;
}

function matriz_adjacencias() {
    //||
    $('.arestas-cima').html('<th scope="col">#</th>');
    $('.arestas-lado').html('');
    for (let i = 1; i <= vertices; i++) {
        $('.arestas-cima').append(`<th scope="col">${i}</th>`);
        $('.arestas-lado').append(`<tr>`);

        $('.arestas-lado').append(`<td scope="row"><b>${i}<b/></td>`);
        for (let y = 1; y <= vertices; y++) {
            matriz_arestas.forEach(array => {
                primeiro_valor = array[0];
                segundo_valor = array[1];
                if (primeiro_valor == i && segundo_valor == y) {
                    arestas.forEach(aresta => {
                        if ((aresta.origem == i && aresta.destino == y) || (aresta.origem == y && aresta.destino == i)) {
                            $('.arestas-lado').append(`<td id='td-${i}-${y}' style="color: red; background-color:#f1f1f1;" class="text-center"><b>${aresta.peso}</b></td>`);
                        }
                    });
                }
            });
            if (document.getElementById(`td-${i}-${y}`) === null) {
                if (i < y || i == y) {
                    $('.arestas-lado').append(`<td id='td-${i}-${y}' class="text-center">0</td>`);
                } else {
                    $('.arestas-lado').append(`<td id='td-${i}-${y}'></td>`);
                }
            }
        }

        $('.arestas-lado').append(`</tr>`);
    }

}

function criar_aresta(a_origem, a_destino) {
    let opcoes = [];
    let i = 1;
    while (i <= vertices) {
        if (i != 1) {
            if (i != 2) {
                if (i != vertices - 1) {
                    if (i != vertices) {
                        if (i % 2 != 0) {
                            opcoes.push({
                                vertice: i,
                                opcoes: [i - 2, i - 1, i + 1, i + 2, i + 3]
                            });
                        } else {
                            opcoes.push({
                                vertice: i,
                                opcoes: [i - 3, i - 2, i - 1, i + 1, i + 2]
                            });
                        }

                    } else {
                        opcoes.push({
                            vertice: i,
                            opcoes: [i - 2, i - 1]
                        });
                    }
                } else {
                    if (i % 2 != 0) {
                        opcoes.push({
                            vertice: i,
                            opcoes: [i - 2, i - 1, i + 1]
                        });
                    } else {
                        opcoes.push({
                            vertice: i,
                            opcoes: [i - 3, i - 2, i - 1, i + 1]
                        });
                    }

                }

            } else {
                opcoes.push({
                    vertice: i,
                    opcoes: [i - 1, i + 1, i + 2]
                });
            }
        } else {
            opcoes.push({
                vertice: i,
                opcoes: [i + 1, i + 2, i + 3]
            });
        }
        i++;
    }

    opcoes.forEach(vertice => {
        if (vertice.vertice == a_origem) {
            if (vertice.opcoes.indexOf(a_destino) > -1) {
                console.log('valido ' + a_origem + '-' + a_destino);
                if (a_origem % 2 != 0) {
                    if (a_destino == a_origem + 3 || a_destino == a_origem - 1) {
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1.41
                        });
                    } else {
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1
                        });
                    }
                } else {
                    if (a_destino == a_origem - 3 || a_destino == a_origem + 1) {
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1.41
                        });
                    } else {
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1
                        });
                    }
                }

                if (a_origem < a_destino) { matriz_arestas.push([a_origem, a_destino]); } else { matriz_arestas.push([a_destino, a_origem]) }
            } else {
                console.log('invalido ' + a_origem + '-' + a_destino);
            }
        }
    });

    console.log(matriz_arestas);
}

function dijkstra(a_origem, a_destino) {

    console.log(a_origem);
    console.log(a_destino);
    let atual = a_origem;
    let filhos = [];
    let caminhos = [];
    let caminho = [a_origem];
    let proibido = [];
    let distancia = 0;

    while (caminhos.length < num_caminhos(a_destino)) {
        console.log('alo');
        atual = a_origem;
        caminho = [a_origem];
        distancia = 0;
        while (atual != a_destino) {
            filhos = verifica_filhos(atual, proibido);
            if (filhos.length > 0) {
                anterior = atual;
                atual = menor_custo(filhos);
                distancia += calcula_distancia(anterior, atual);
                console.log(calcula_distancia(anterior, atual))
                caminho.push(atual);
            } else {
                proibido.push(atual);
                atual = a_origem;
                caminho = [a_origem];
            }
        }

        caminhos.push([caminho, distancia]);
        proibido.push(caminho[1]);

    }

    var m_caminho = melhor_caminho(caminhos);
    console.log(m_caminho);
    pinta_caminho(m_caminho[0]);
    $("#caminho-peso").html(`O peso do caminho percorrido foi: ${m_caminho[1]}<br>O caminho percorrido foi: ${m_caminho[0].join(" --> ")}<br>`);
    $("#caminho-peso").addClass('black');
    manhattan(a_origem, a_destino);
}

function melhor_caminho(caminhos) {
    let melhor = 999;
    let m_caminho;

    caminhos.forEach(caminho => {
        if (caminho[1] < melhor) {
            m_caminho = caminho;
            melhor = caminho[1];
        }
    });

    return m_caminho;
}

function calcula_distancia(anterior, atual) {
    let peso = 0;

    arestas.forEach(aresta => {
        if (aresta.origem == anterior && aresta.destino == atual) {
            peso = aresta.peso;
        }
    });

    return peso;
}

function num_caminhos(destino) {
    let num = 0;
    arestas.forEach(aresta => {
        if (aresta.destino == destino) {
            num++;
        }
    });

    return num;
}

function menor_custo(filhos) {
    let menor;
    let menor_peso = 99999;
    filhos.forEach(filho => {
        if (filho.peso < menor_peso) {
            menor = filho;
            menor_peso = filho.peso;
        }
    });

    return menor.destino;
}

function manhattan(a_origem, a_destino) {
    let origem = [0, 0];
    let destino = [0, 0];
    let calculo = 0;
    grafo.forEach(aresta => {
        if (aresta[1] == a_origem) {
            origem = aresta;
        }

        if (aresta[1] == a_destino) {
            destino = aresta;
        }
    });

    var o_posicao_y = origem[0];
    var d_posicao_y = destino[0];
    if (origem[1] % 2 == 0) {
        var o_posicao_x = 1;
        for (let i = 2; i < origem[1]; i += 2) {
            o_posicao_x++;
        }
    } else {
        var o_posicao_x = 1;
        for (let y = 1; y < origem[1]; y += 2) {
            o_posicao_x++;
        }
    }

    if (destino[1] % 2 == 0) {
        var d_posicao_x = 1;
        for (let i = 2; i < destino[1]; i += 2) {
            d_posicao_x++;
        }
    } else {
        var d_posicao_x = 1;
        for (let y = 1; y < destino[1]; y += 2) {
            d_posicao_x++;
        }
    }

    let c_x = Math.abs((o_posicao_x - d_posicao_x));
    let c_y = Math.abs((o_posicao_y - d_posicao_y));
    calculo = c_x + c_y;

    console.log('OX:' + o_posicao_x + ' OY:' + o_posicao_y);
    console.log('DX:' + d_posicao_x + ' DY:' + d_posicao_y);
    $("#caminho-peso").append('Distancia Manhanttan: ' + calculo);

}

function verifica_filhos(vertice, proibido) {
    let filhos = [];
    arestas.forEach(aresta => {
        if (aresta.origem == vertice) {
            if (proibido.indexOf(aresta.destino) == -1) {
                filhos.push(aresta);
            }
        }
    });

    return filhos;
}

function pinta_caminho(caminho) {
    for (let vertice = 0; vertice < 21; vertice++) {
        $(`#vertice-${vertice}`).removeClass('verticepercorrido');
    }
    caminho.forEach(function (vertice, index) {
        setTimeout(function () {
            $(`#vertice-${vertice}`).addClass('verticepercorrido');
        }, index * 700);
    });
}