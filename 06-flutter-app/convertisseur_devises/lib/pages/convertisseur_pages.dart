import 'package:convertisseur_devises/models/devise.dart';
import 'package:convertisseur_devises/styles.dart';
import 'package:flutter/material.dart';

class ConvertisseurDevisePage extends StatefulWidget {
  ConvertisseurDevisePage();
  @override
  State<StatefulWidget> createState() {
    return _ConvertisseurDevisePage();
  }
}

class _ConvertisseurDevisePage extends State<ConvertisseurDevisePage> {
  // les différents "états" de la page
  double _valeur; // valeur saisie
  Devise _deviseInitial; // devise initiale sélectionnée
  Devise _deviseFinale; // devise finale sélectionnée
  double _resultat; // le résultat de la conversion

  // définition des valeurs initiales
  @override
  void initState() {
    super.initState();
    _valeur = 0;
    _resultat = 0;
    _deviseInitial = Devise.EURO;
    _deviseFinale = Devise.DOLLAR;
  }

  void convertDevise() {
    setState(() {
      _resultat = _deviseInitial.convert(_valeur, _deviseFinale);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          Spacer(),
          Text(
            'Valeur',
            style: AppStyle.labelStyle,
          ),
          Spacer(),
          TextField(
            style: AppStyle.inputStyle,
            onChanged: (saisie) {
              setState(() {
                _valeur = double.parse(saisie);
              });
            },
          ),
          Spacer(),
          Text(
            'De',
            style: AppStyle.labelStyle,
          ),
          Spacer(),
          DropdownButton(
            value: _deviseInitial,
            isExpanded: true,
            onChanged: (newVal) => setState(() {
              _deviseInitial = newVal;
            }),
            items: [ for (Devise devise in Devise.values)
              DropdownMenuItem<Devise>(
                child: Text(devise.libelle),
                value: devise,
              )
            ],
          ),
          Spacer(),
          Text('Vers', style: AppStyle.labelStyle),
          Spacer(),
          DropdownButton(
            value: _deviseFinale,
            isExpanded: true,
            onChanged: (newVal) => setState(() {
              _deviseFinale = newVal;
            }),
            items: [ for (Devise devise in Devise.values)
              DropdownMenuItem<Devise>(
                child: Text(devise.libelle),
                value: devise,
              )
            ]
          ),
          Spacer(
            flex: 2,
          ),
          ElevatedButton(onPressed: () => this.convertDevise(), child: Text('Convertir')),
          Spacer(
            flex: 2,
          ),
          Text(_resultat.toString(), style: AppStyle.labelStyle),
          Spacer(),
        ],
      ),
    );
  }
}
