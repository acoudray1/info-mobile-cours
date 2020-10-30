import 'package:convertisseur_devises/models/devise.dart';
import 'package:flutter/material.dart';

class ListeDevise extends StatelessWidget {

  ListeDevise({this.devise, this.onChanged});

  final Devise devise;
  final void Function(Devise) onChanged;

  @override
  Widget build(BuildContext context) {
    return DropdownButton<Devise>(
      value: devise,
      isExpanded: true,
      onChanged: onChanged,
      items: [ for (Devise devise in Devise.values)
        DropdownMenuItem<Devise>(
          child: Text(devise.libelle),
          value: devise,
        )
      ],
    );
  }
}